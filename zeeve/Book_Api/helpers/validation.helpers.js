function empty(param)
{
    if(param==null||param==undefined||param=="")
    return true;
    else
    return false;
}
function validemail(param)
{
    return param.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
};
function validphn(param)
{
    return param.match(/^[6-9]\d{9}$/gi);
};
module.exports={
    empty,
    validemail,
    validphn
};