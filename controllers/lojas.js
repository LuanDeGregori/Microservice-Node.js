module.exports = function(app){
    app.get('/cadastro',(req,res)=>{
        res.send('Get Recebido');
    })
}