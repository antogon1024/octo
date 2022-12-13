<?php

/*
 * This file is part of the 2amigos/yii2-usuario project.
 *
 * (c) 2amigOS! <http://2amigos.us/>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace app\controllers;

use Da\User\Event\FormEvent;
use Da\User\Factory\MailFactory;
use Da\User\Form\RegistrationForm;
use Da\User\Model\User;
use Da\User\Service\UserRegisterService;
use Da\User\Traits\ContainerAwareTrait;
use Da\User\Traits\ModuleAwareTrait;
use Da\User\Validator\AjaxRequestModelValidator;
use Yii;

use Da\User\Controller\RegistrationController as BaseController;

class RegistrationController extends BaseController
{
    use ContainerAwareTrait;
    use ModuleAwareTrait;

    protected $userQuery;

    public function behaviors()
    {
        return [];
    }

    public function actionRegister()
    {
        /*if (!$this->module->enableRegistration) {
            throw new NotFoundHttpException();
        }*/
        if(!Yii::$app->user->isGuest){
            return $this->redirect(['/']);
        }

        /** @var RegistrationForm $form */
        $form = $this->make(RegistrationForm::class);
        /** @var FormEvent $event */
        $event = $this->make(FormEvent::class, [$form]);

        $this->make(AjaxRequestModelValidator::class, [$form])->validate();

        if ($form->load(Yii::$app->request->post()) && $form->validate()) {
            $this->trigger(FormEvent::EVENT_BEFORE_REGISTER, $event);

            /** @var User $user */

            // Create a temporay $user so we can get the attributes, then get
            // the intersection between the $form fields  and the $user fields.
            $user = $this->make(User::class, [] );
            $fields = array_intersect_key($form->attributes, $user->attributes);

             // Becomes password_hash
            $fields['password'] = $form['password'];

            $user = $this->make(User::class, [], $fields );

            $user->setScenario('register');
            $mailService = MailFactory::makeWelcomeMailerService($user);

            if ($this->make(UserRegisterService::class, [$user, $mailService])->run()) {
                $user = \Da\User\Model\User::findOne([
                    'username' => $user->username,
                    'email'=> $user->email,
                ]);
                if ($user) {
                    \Yii::$app->user->switchIdentity($user);
                    return $this->redirect(['/generator']);
                }

                /*if ($this->module->enableEmailConfirmation) {
                    Yii::$app->session->setFlash(
                        'info',
                        Yii::t(
                            'usuario',
                            'Your account has been created and a message with further instructions has been sent to your email'
                        )
                    );
                } else {
                    Yii::$app->session->setFlash('info', Yii::t('usuario', 'Your account has been created'));
                }
                $this->trigger(FormEvent::EVENT_AFTER_REGISTER, $event);
                return $this->render(
                    '/shared/message',
                    [
                        'title' => Yii::t('usuario', 'Your account has been created'),
                        'module' => $this->module,
                    ]
                );*/
            }
            Yii::$app->session->setFlash('danger', Yii::t('usuario', 'User could not be registered.'));
        }
        return $this->render('register', ['model' => $form, 'module' => $this->module]);
    }
}
