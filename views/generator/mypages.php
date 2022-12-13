<?php
use yii\helpers\Url;
?>
<?php 
    foreach ($pages as $v):
    //$url = Url::to(['/generator', 'id' => $v['id']]);
    $caption = (empty($v['caption'])) ? 'Без названия' : $v['caption'];
    ?>
        <a href="/generator/<?=$v['id']?>"><?=$caption?></a><br>

<?php endforeach; ?>

