<h3>create page</h3>
<?php
if(Yii::$app->user->isGuest){
    echo 'guest';
}else{
    echo 'no guest';
}

echo '<pre>';print_r(Yii::$app->user->identity->username);

?>