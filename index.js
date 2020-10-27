const $  =require('jquery')

$(document).ready(function(){
    let lcc;
    
    var data = []
    $('.rows > .cell').on('click', function(){
        // console.log(this)
        // console.log(($(this).attr('row')))
        let rid = parseInt($(this).attr('row'));
        let cid = parseInt($(this).attr('col'));
        let colAddr = String.fromCharCode(65 + cid);
        let rowAddr = rid + 1;
        $('.address-container').val(colAddr+rowAddr)
        console.log(colAddr+rowAddr)
    })
    $('.rows .cell').on('click', function(){

    })
    $('.rows .cell').on('blur', function(){
        lcc = this
        let cellObj = getIndices(lcc)
        data[cellObj.rid][cellObj.cid].value = $(this).val();
        console.log(lcc, data)
    })
    $('.formula-container').on('blur', function(){
        let cellIndices = getIndices(lcc)
        let cellObject = data[cellIndices.rid][cellIndices.cid]
        if(cellObject.formula == $(this).val())
            return;
        if(cellObject.formula){
            deleteFormula(cellObject, lcc)
        }
        cellObject.formula = $(this).val()
        setFormula(lcc, cellObject.formula)
        // updateCell(cellIndices.rid, cellIndices.cid, )
        
    })
    function deleteFormula(cellObject, lcc){
        cellObject.formula = '';
        let{rid , cid} = getIndices(lcc)
        for(let i=0 ; i<cellObject.upstream.length ; i++){
            let uso = cellObject.upstream[i]
            let fuso = data[uso.rid][uso.cid]
            let fArr = fuso.downstream.filter((item)=>{
                return item.rid!=rid && item.cid!=cid
            })
            fuso.downstream = fArr
        }
        cellObject.upstream=[]
    }
    function setFormula(cellObject, formula){
        formula = formula.replace(')','').replace('(','')
        let formulaComponents = formula.split(' ')
        for(let i=0 ; i<formulaComponents.length ; i++){
            let chCode = formulaComponents[i].charCodeAt(0);
            if(chCode>=65 && chCode<=90){
                let upstreamAddress = getIndicesFromAddress(formulaComponents[i])
                let myIndices = getIndices(cellObject)
                data[upstreamAddress.rid][upstreamAddress.cid].downstream.push({
                    rid : myIndices.rid,
                    cid : myIndices.cid
                })
                data[myIndices.rid][myIndices.cid].upstream.push({
                    rid : upstreamAddress.rid,
                    cid : upstreamAddress.cid
                })
            }
        }
    }

    function getIndicesFromAddress(formulaComponent){
        let rid = parseInt(formulaComponent.substring(1)) - 1
        let cid = formulaComponent.charCodeAt(0) - 65
        return {
            rid : rid,
            cid : cid
        }
    }
    function getIndices(cellObject){
        return {
            rid : parseInt($(cellObject).attr('row')),
            cid : parseInt($(cellObject).attr('col'))
        }
    }
    function start(){
        $('.grid').find('.rows').each(function(){
            let row = []
            $(this).find('.cell').each(function(){
                let cell = {
                    value : '',
                    formula : '',
                    upstream : [],
                    downstream : []
                }
                console.log('hi')
                $(this).html(cell.value)
                row.push(cell)
            })
            data.push(row)
        })
        console.log(data)
    }
    start();
})