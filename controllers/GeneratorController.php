<?php

namespace app\controllers;

use app\components\SimpleImage;
use app\models\Avatar;
use Yii;

use yii\web\Controller;
use app\models\Page;
use yii\web\UploadedFile;
use yii\helpers\Url;

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

    public function actionPage($id)
    {
        $page = Page::find()
            ->where(['id' => $id])
            ->one();

        $srcHeader = '/web/img/header/' . '/' . $page->user_id . '/' . $page->header;
        $srcAvatar = '/web/img/avatar/' . '/' . $page->user_id . '/' . $page->avatar;

        $avatar = ($page->avatar) ? $srcAvatar : '/web/img/avatar.jpg';
        $header = ($page->header) ? $srcHeader : '/web/img/header.jpg';

        if(Yii::$app->request->isPost){
            if(isset(Yii::$app->request->post()['fheader'])){
                $page->header = UploadedFile::getInstance($page, 'header');
            }
            if(isset(Yii::$app->request->post()['favatar'])){
                $page->avatar = UploadedFile::getInstance($page, 'avatar');
            }

            $page->saveHeader();
            return $this->redirect(Yii::$app->request->url);
        }

        if(is_object($page->avatar)){
            $page->saveAvatar();
            return $this->redirect(Yii::$app->request->url);
        }

        return $this->render('page', [
            'page' => $page,
            'header' => $header,
            'avatar' => $avatar,
        ]);
    }

    public function actionNewPage()
    {
        $userId = Yii::$app->user->identity->id;
        $page = new Page();
        $page->user_id = $userId;
        $page->save(false);

        $url = Url::to(['generator/page', 'id' => $page->id]);
        return $this->redirect($url);
    }

    public function actionMyPages()
    {

    }

    public function actionDeletePage($id)
    {

    }
}
