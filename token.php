<?php
function token ($length){
     $characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPKRSTUV";

    return substr(str_shuffle(str_repeat($characters, $length)),0, $length);
}

var_dump(token(30));