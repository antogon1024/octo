<?php

use app\assets\AppAsset;
AppAsset::register($this);
?>

<?php $this->beginPage() ?>
    <!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>" class="h-100">
    <head>
        <meta charset="<?= Yii::$app->charset ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <?php $this->registerCsrfMetaTags() ?>
        <title>ggggggg</title>
        <?php $this->head() ?>
    </head>
    <body class="d-flex flex-column h-100">
<?php $this->beginBody() ?>

<?php $this->endBody() ?>
    </body>
</html>
<?php $this->endPage() ?>
