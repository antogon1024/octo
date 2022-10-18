<?php
/** @var yii\web\View $this */
/** @var string $content */

//use app\assets\AppAsset;
use app\widgets\Alert;
use yii\bootstrap4\Breadcrumbs;
use yii\bootstrap4\Html;
use yii\bootstrap4\Nav;
use yii\bootstrap4\NavBar;

use app\assets\LoginAsset;
LoginAsset::register($this);
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
</head>
<body class="d-flex flex-column h-100">
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

    if (!Yii::$app->user->getIsGuest()) {
        $items = [
            ['label' => 'Выйти', 'url' => ['/logout']],
        ];
    }else{
        $items = [
            ['label' => 'Войти', 'url' => ['/login']],
            ['label' => 'Регистрация', 'url' => ['/register']],
            ['label' => 'Восстановить пароль', 'url' => ['/forgot']],
        ];
    }

    echo Nav::widget([
        'options' => ['class' => 'navbar-nav'],
        'items' => $items,
    ]);
    NavBar::end();
    ?>
</header>

<main role="main">
    <div class="container" style="padding-top: 80px">
        <?php //= Alert::widget() ?>
        <?= $content ?>
    </div>
</main>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
