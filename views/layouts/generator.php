<?php

/** @var yii\web\View $this */
/** @var string $content */

use app\assets\GeneratorAsset;
use app\widgets\Alert;
use yii\bootstrap4\Breadcrumbs;
use yii\bootstrap4\Html;
use yii\bootstrap4\Nav;
use yii\bootstrap4\NavBar;

GeneratorAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>" class="h-100">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <?php $this->registerCsrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <!--<script src="https://api-maps.yandex.ru/2.1/?apikey=b18e1a55-f988-4079-b0b6-3ae62da2676b&lang=ru_RU" type="text/javascript">
    </script>-->
</head>
<body class="d-flex flex-column h-100">
<div class="ttt" style="position: absolute;z-index: 10000;text-align: center">a</div>
<?php $this->beginBody() ?>

<header>
    <?php
    NavBar::begin([
        'brandUrl' => Yii::$app->homeUrl,
        'brandImage' => '/web/img/logo.svg',
        'options' => [
            'class' => 'navbar navbar-expand-md navbar-dark bg-dark fixed-top',
        ],
    ]);
    echo Nav::widget([
        'options' => ['class' => 'navbar-nav'],
        'items' => [
            ['label' => 'Новая страница', 'url' => ['generator/new-page']],
            ['label' => 'Мои страницы', 'url' => ['generator/my-pages']],
        ],
    ]);

    echo Nav::widget([
        'options' => ['class' => 'navbar-nav'],
        'items' => [
            ['label' => 'Выйти', 'url' => ['generator/logout']],
        ],
    ]);
    NavBar::end();
    ?>


</header>

<main role="main">
    <div class="container" style="padding-top: 100px">
        <?php //= Alert::widget() ?>
        <?= $content ?>
    </div>
</main>
<div style="padding: 30px"></div>
<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
