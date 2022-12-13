<?php

namespace app\controllers;

//use app\components\SimpleImage;
//use app\models\Avatar;
use app\models\Slider;
/*test*/
use app\models\UploadForm;
/*test*/
use Yii;

use yii\web\Controller;
use app\models\Page;
use yii\web\UploadedFile;
use yii\helpers\Url;




class GeneratorController extends Controller
{
    public $enableCsrfValidation = false;

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

        $slider = new Slider();
        /*$slider->user_id = Yii::$app->user->identity->id;
        $slider->page_id = 4;
        $slider->image = 'ddd';
        $slider->save(false);*/

        $srcHeader = '/web/img/header/' . '/' . $page->user_id . '/' . $page->header;
        $srcAvatar = '/web/img/avatar/' . '/' . $page->user_id . '/' . $page->avatar;

        $avatar = ($page->avatar) ? $srcAvatar : '/web/img/avatar.jpg';
        $header = ($page->header) ? $srcHeader : '/web/img/header.jpg';

        if(Yii::$app->request->isPost){
            if(isset(Yii::$app->request->post()['fheader'])){
                $page->header = UploadedFile::getInstance($page, 'header');
                $page->saveHeader();
            }
            if(isset(Yii::$app->request->post()['favatar'])){
                $page->avatar = UploadedFile::getInstance($page, 'avatar');
                $page->saveHeader();
            }
            if(isset($_FILES['croppedImage']) && $_FILES['croppedImage']['error'] == 0){
                $slider->width = 400;
                $slider->height = 500;
                return $slider->saveImage($id, $_FILES['croppedImage']);
            }

            if(isset(Yii::$app->request->post()['page'])){
                $page->page = trim( Yii::$app->request->post()['page'] );
                $page->save(false);
            }

            return $this->redirect(Yii::$app->request->url);
        }

        return $this->render('page', [
            'page' => $page,
            'slider' => $slider,
            'header' => $header,
            'avatar' => $avatar,
        ]);
    }

    public function actionRemoveImg()
    {
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $name = $post['name'];
            $id = $post['page_id'];
            $path = Yii::getAlias('@app') . "/web/img/slider/" . $id . '/' . $name;
            if(unlink($path)){
                $slider = Slider::findOne(['page_id' => $id, 'image' => $name]);
                $slider->delete();
            }
            $page = Page::findOne($id);
            $page->page = trim( $post['page'] );
            $page->save(false);
            return $this->redirect('/generator/' . $id);
        }
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
        $userId = Yii::$app->user->identity->id;

        $pages = Page::find()
            ->where(['user_id' => $userId])
            ->asArray()
            ->all();
        //echo '<pre>';print_r($pages);exit;

        return $this->render('mypages', [
            'pages' => $pages,
        ]);
    }

    public function actionDeletePage($id)
    {

    }

    public function actionTest()
    {
        $this->layout = 'empty';
        //$this->enableCsrfValidation = false;

        $form = new UploadForm();

        if (Yii::$app->request->isPost) {
            $form->files = UploadedFile::getInstances($form, 'files');
echo '<pre>';print_r($_FILES);exit;
            if ($form->files && $form->validate()) {
                echo '<pre>';print_r($form->files);exit;
                foreach ($form->files as $file) {
                    //$image = new ProductImage();
                    if ($image->save()) {
                        $file->saveAs($image->getPath());
                    }
                }

            }
        }

        return $this->render('test', [
            'uploadForm' => $form,
        ]);



        /*$model = new UploadForm();

        if (Yii::$app->request->isPost) {
            $model->imageFiles = UploadedFile::getInstances($model, 'imageFiles');
            if ($model->upload()) {
echo '<pre>';print_r($_FILES);exit;
                // file is uploaded successfully
                //return;
            }
        }

        return $this->render('test', ['model' => $model]);
        */

    }
}
