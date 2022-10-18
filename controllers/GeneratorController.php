<?php

namespace app\controllers;

use Yii;

use yii\web\Controller;

class GeneratorController extends Controller
{
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    public function init()
    {
        parent::init();
        $this->layout = 'generator';
    }

    public function actionIndex()
    {
        $this->layout = 'index';
        return $this->render('index');
    }

    public function actionLogout()
    {
        Yii::$app->user->logout();
        return $this->redirect(['/']);
    }

    public function actionCreatePage()
    {
        return $this->render('create-page');
    }

}
