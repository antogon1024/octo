<?php

namespace app\controllers;

//use app\components\SimpleImage;
//use app\models\Avatar;
use app\models\Slider;
/*test*/
use app\models\UploadForm;
/*test*/
use Yii;

use yii\filters\AccessControl;
use yii\filters\VerbFilter;
use yii\helpers\FileHelper;
use yii\web\Controller;
use app\models\Page;
use yii\web\UploadedFile;
use yii\helpers\Url;




class GeneratorController extends Controller
{
    public $enableCsrfValidation = false;

    public function init()
    {
        parent::init();
        $this->layout = 'generator';

        if(Yii::$app->user->isGuest){
            //return $this->redirect(['/logout']);
        }
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
        if(Yii::$app->user->isGuest){
            return $this->redirect(['/logout']);
        }

        $page = Page::find()
            ->where(['id' => $id])
            ->one();

        $slider = new Slider();
        $srcHeader = '/web/img/header/' . $page->user_id . '/' . $page->header;
        $srcAvatar = '/web/img/avatar/' . $page->user_id . '/' . $page->avatar;

        $avatar = ($page->avatar) ? $srcAvatar : '/web/img/user.jpg';
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
                //echo '<pre>';print_r(Yii::$app->request->post());exit;
                $page->page = trim( Yii::$app->request->post()['page'] );
                $page->bgcolor = trim( Yii::$app->request->post()['bgcolor'] );
                $page->show_page = trim( Yii::$app->request->post()['show-page'] );
                $page->caption = trim( Yii::$app->request->post()['caption'] );
                $page->setting = trim( Yii::$app->request->post()['setting'] );
                $page->block = trim( Yii::$app->request->post()['block'] );
                $page->save(false);
            }

            return $this->redirect(Yii::$app->request->url);
        }

        $url = str_replace('generator', 'page', Yii::$app->request->url);
        $host = Yii::$app->request->hostName;
        //echo '<pre>';print_r($page);exit;
        $ar = ['button', 'text', 'video', 'map', 'slider'];
        $arBlock['setBlock'] = 'display:none';
        $arBlock['setPage'] = 'display:block';

        foreach($ar as $v){
            if($page->block == $v) {
                $arBlock[$v] = 'display:block';
                $arBlock['setBlock'] = 'display:block';
                $arBlock['setPage'] = 'display:none';
            }else{
                $arBlock[$v] = 'display:none';
            }
        }
        //echo '<pre>';print_r($arBlock);exit;

        return $this->render('page', [
            'page' => $page,
            'checked' => ($page->show_page == 1) ? ' checked' : '',
            'slider' => $slider,
            'header' => $header,
            'avatar' => $avatar,
            'url' => $host . $url,
            'url2' => $url,
            'arBlock' => $arBlock,
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

    public function actionRemovePage()
    {
        if(Yii::$app->request->isPost){
            $post = Yii::$app->request->post();
            $page = Page::findOne($post['page_id']);

            if($post['action'] == 'block'){
                $page->page = trim( $post['page'] );
                $page->setting = trim( $post['setting'] );
                $page->save(false);
                return $this->redirect('/generator/' . $post['page_id']);
            }else{
                $page->delete();
                $path = Yii::getAlias('@app') . "/web/img/slider/" . $post['page_id'];
                if(file_exists($path)){
                    FileHelper::removeDirectory($path);
                }
                return $this->redirect('/generator/my-pages');
            }
            //return $this->redirect('/generator/' . $post['page_id']);
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
        if(Yii::$app->user->isGuest){
            return $this->redirect(['/logout']);
        }

        $userId = Yii::$app->user->identity->id;

        $pages = Page::find()
            ->where(['user_id' => $userId])
            ->asArray()
            ->all();

        return $this->render('mypages', [
            'pages' => $pages,
        ]);
    }

    public function actionPages($id)
    {
        $this->layout = 'pages';
        $page = Page::find()
            ->where(['id' => $id])
            ->one();
//echo '<pre>';print_r($page);exit;
        return $this->render('pages', [
            'id' => $id,
            'page' => $page,
        ]);
    }

    public function actionDeletePage($id)
    {

    }

    public function actionTest()
    {
        $this->layout = 'empty';
        //$this->enableCsrfValidation = false;

        return $this->render('test', [

        ]);
    }
}
