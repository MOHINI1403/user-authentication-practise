const jwt=require('jsonwebtoken');

//WE can add this middleware function to any route

//This function checks that weather the user has a particular token
function auth(req,resp,next){
    const token=req.header('Auth-Token');//In req header we are checking for the token with this name

    if(!token)return resp.status(401).send('Access Denied');//If the token does not exists
    //If the token exits we need to verfy the token
    try{
        //One of the methods of the jwt
        const verified=jwt.verify(token,process.env.TOKEN_SECRET);
        req.user=verified;
    }
    catch(err){
        resp.status(400).send('Invalid Token Here');
    }
}