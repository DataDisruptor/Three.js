import { Mesh } from "three";

export function backAndForth(obj : Mesh){
    if (obj.position.x <= 25)
    {
        obj.position.x += 0.01;
    }
    else
    {
        obj.position.x -= -0.01;
    }


}
