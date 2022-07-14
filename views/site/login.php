<?php

/** @var yii\web\View $this */
/** @var yii\bootstrap4\ActiveForm $form */
/** @var app\models\LoginForm $model */

use yii\bootstrap4\ActiveForm;
use yii\bootstrap4\Html;

//$this->title = 'Login';
//$this->params['breadcrumbs'][] = $this->title;
?>
<!--<div class="site-login">
    <h1><?/*= Html::encode($this->title) */?></h1>

    <p>Please fill out the following fields to login:</p>

    <?php /*$form = ActiveForm::begin([
        'id' => 'login-form',
        'layout' => 'horizontal',
        'fieldConfig' => [
            'template' => "{label}\n{input}\n{error}",
            'labelOptions' => ['class' => 'col-lg-1 col-form-label mr-lg-3'],
            'inputOptions' => ['class' => 'col-lg-3 form-control'],
            'errorOptions' => ['class' => 'col-lg-7 invalid-feedback'],
        ],
    ]); */?>

        <?/*= $form->field($model, 'username')->textInput(['autofocus' => true]) */?>

        <?/*= $form->field($model, 'password')->passwordInput() */?>

        <?/*= $form->field($model, 'rememberMe')->checkbox([
            'template' => "<div class=\"offset-lg-1 col-lg-3 custom-control custom-checkbox\">{input} {label}</div>\n<div class=\"col-lg-8\">{error}</div>",
        ]) */?>

        <div class="form-group">
            <div class="offset-lg-1 col-lg-11">
                <?/*= Html::submitButton('Login', ['class' => 'btn btn-primary', 'name' => 'login-button']) */?>
            </div>
        </div>

    <?php /*ActiveForm::end(); */?>

    <div class="offset-lg-1" style="color:#999;">
        You may login with <strong>admin/admin</strong> or <strong>demo/demo</strong>.<br>
        To modify the username/password, please check out the code <code>app\models\User::$users</code>.
    </div>
</div>-->

<div class="container">
    <div class="row">
        <div class="col col-lg-6">
           <div style="max-width: 23rem">

               <div class="text-center mb-5">
                   <img class="img-fluid" src="/web/img/chat.svg" alt="Image Description" style="width: 12rem;">
               </div>


            <div class="mb-5">
                <h2 class="display-4">Создайте свой сайт:</h2>
            </div>

            <ul class="list-checked list-checked-lg list-checked-primary list-unstyled-py-4" style="padding: 0">
                <li class="list-checked-item">
                    <span class="d-block font-weight-bold mb-1">Бесплатное создание страниц</span>
                    Кнопки, изображения, видео, социальные сети, мессенджеры, вопросы и ответы, текстовые блоки и многое другое
                </li>

                <li class="list-checked-item">
                    <span class="d-block font-weight-bold mb-1">Рекламная страница с проверкой подписчиков</span>
                </li>
            </ul>



               <div class="row justify-content-between mt-5 gx-2">
                   <div class="col">
                       <img class="img-fluid" src="/web/img/instagram.svg" alt="Image Description">
                   </div>
                   <div class="col">
                       <img class="img-fluid" src="/web/img/flow-xo-gray.svg" alt="Image Description">
                   </div>
                   <div class="col">
                       <img class="img-fluid" src="/web/img/layar-gray.svg" alt="Image Description">
                   </div>
               </div>


           </div>
        </div>

        <div class="col col-lg-6">
            <div class="wrap-login">
            <div class="" style="max-width: 370px; width: 100%">

            <div class="text-center mb-5">
                <h1 class="display-4">Войти</h1>
                <p class="text-center">
                    Нет аккаунта? <a href="/user/register">Зарегистрируйтесь</a>            </p>
            </div>

            <?php $form = ActiveForm::begin([
                'id' => 'login-form',
                'layout' => 'horizontal',
                'fieldConfig' => [
                    'template' => "{label}\n{input}\n{error}",
                ],
            ]); ?>

            <?= $form->field($model, 'username')->textInput()->label('Логин') ?>

            <?= $form->field($model, 'password')->passwordInput()->label('Пароль') ?>

            <?= $form->field($model, 'rememberMe')->checkbox([
                //'template' => "<div class=\"2col-lg-3 22custom-control custom-checkbox\">{input} {label}</div>\n<div class=\"col-lg-8\">{error}</div>",
                    'template' => "<div class=\"2col-lg-3 22custom-control custom-checkbox\">{input} {label}</div>",
            ]) ?>


            <div class="form-group row">
                <?= Html::submitButton('Войти', ['class' => 'btn btn-primary log-button', 'name' => 'login-button']) ?>
            </div>

            <?php ActiveForm::end(); ?>

            </div>
            </div>
        </div>
    </div>
</div>
