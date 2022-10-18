<?php

/*
 * This file is part of the 2amigos/yii2-usuario project.
 *
 * (c) 2amigOS! <http://2amigos.us/>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/**
 * @var yii\web\View                   $this
 * @var \Da\User\Form\RegistrationForm $model
 * @var \Da\User\Model\User            $user
 * @var \Da\User\Module                $module
 */

$this->title = Yii::t('usuario', 'Sign up');
$this->params['breadcrumbs'][] = $this->title;
?>

    <div class="col-md-6" style="padding-top: 50px">
        <div class="panel panel-default" style="max-width: 23rem; margin-left: auto; margin-right: 0;">
            <div class="panel-heading">
                <h3 class="panel-title"><?= Html::encode($this->title) ?></h3>
            </div>
            <div class="panel-body">
                <?php $form = ActiveForm::begin(
                    [
                        'id' => $model->formName(),
                        'enableAjaxValidation' => true,
                        'enableClientValidation' => false,
                    ]
                ); ?>

                <?= $form->field($model, 'email')->textInput(['autofocus' => true]) ?>

                <?= $form->field($model, 'username') ?>

                <?php if ($module->generatePasswords === false): ?>
                    <?= $form->field($model, 'password')->passwordInput() ?>
                <?php endif ?>

                <?php if ($module->enableGdprCompliance): ?>
                    <?= $form->field($model, 'gdpr_consent')->checkbox(['value' => 1]) ?>
                <?php endif ?>

                <?= Html::submitButton(Yii::t('usuario', 'Sign up'), ['class' => 'btn btn-lg btn-primary btn-block']) ?>

                <?php ActiveForm::end(); ?>
            </div>
        </div>
        <p class="text-center">
            <?= Html::a(Yii::t('usuario', 'Already registered? Sign in!'), ['/login']) ?>
        </p>
    </div>

