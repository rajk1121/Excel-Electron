const $  =require('jquery')

$(document).ready(function(){
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
    function start(){
        let data = []
        $('.grid').find('.rows').each(function(){
            let row = []
            $(this).find('.cell').each(function(){
                let cell = ''
                console.log('hi')
                $(this).html('')
                row.push(cell)
            })
            data.push(row)
        })
        console.log(data)
    }
    start();
})