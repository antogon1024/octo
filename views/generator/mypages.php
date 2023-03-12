<?php

use yii\helpers\Url;

?>
<?php if (count($pages) != 0): ?>
    <?php
    foreach ($pages as $v):
        $caption = (empty($v['caption'])) ? 'Без названия' : $v['caption'];
        ?>
        <a href="/generator/<?= $v['id'] ?>"><?= $caption ?></a><br>
    <?php endforeach; ?>
<?php else: ?>
    <p style="text-align: center">Пока нет ни одной страницы!</p>
<?php endif; ?>


