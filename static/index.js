//Crie a variável de data
var date = new Date()
let displayDate = 'Data: ' + date.toLocaleDateString('pt-BR',{weekday:'short',year:'numeric',month:'short',day:'numeric'})
//Carregue o DOM HTML
$(document).ready(function(){
    $('#display_date').html(displayDate)
})
//Defina a variável para armazenar a emoção prevista
let predictedEmotion 

//HTML-->JavaScript--->Flask
//Flask--->JavaScript--->HTML

//seletor jQuery e ação de clique

$(function () {
    $("#predict_button").click(function () {
        //chamada AJAX
        let imputData = {'text':$('#text').val()}
        $.ajax({
            type:'POST',
            url:'/predict-emotion',
            data:JSON.stringfy(imputData),
            dataType:'json',
            contentType:'application/json',
            success:function(result)
            {
                
                // Resultado recebido do Flask ----->JavaScript
                predictedEmotion = result.data.predicted_emotion
                emoUrl = result.data.predicted_emotion_img_url
                // Exibir resultado usando JavaScript----->HTML
                $('#prediction').html(predictedEmotion)
                $('#prediction').css('display', 'block')
                $('#emo_img_url').attr('src', emoUrl)
                $('#emo_img_url').css('display', 'block')
            },
            //Função de erro
            error:function(result){
                alert(result.responseJSON.message)
            }
        });
    });
})

