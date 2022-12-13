

export function backAndForth(obj){
    if (obj.position.x <= 4)
    {
        obj.position.x += 0.01;
    }
    else if (obj.position.x >= 4)
    {
        obj.position.x -= -0.01;
    }
    console.log(obj.position.x)

}
