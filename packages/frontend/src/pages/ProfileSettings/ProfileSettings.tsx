import { Button, Col, message, Row, Skeleton, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/Redux';
import './ProfileDescription.css';
import { dropRequestUserDataState, fetchUpdateUserProfile, fetchUserInfoData } from 'store/actions/UserActions';
import { Formik } from 'formik';
import { Form, Input, SubmitButton } from 'formik-antd';
import { IUserProfileUpdateData } from 'models/Api/User.api';
import { ProjectRoutes } from 'constants/Routs';
import { Validation } from 'utils/Validation';
import { EUserProfileFileds } from 'models/Common';
import { EStatusLoading } from 'models/Api/common';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

/**
 * Компонент страницы с редактированием профиля пользователя
 */
export const ProfileSettings = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const updateProfileData = useAppSelector((state) => state.user.requestData?.updateProfileData);
    const userInfoData = useAppSelector((state) => state.user.requestData?.userInfoData);

    const { userInfo } = useAppSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const onSubmit = (values: IUserProfileUpdateData, actions) => {
        dispatch(fetchUpdateUserProfile(values)).then(() => {
            actions.setSubmitting(false);
            navigate(ProjectRoutes.profileDescription);
        });
    };
    const onFinishFailed = (errorInfo: any) => {
        message.error(errorInfo);
    };

    useEffect(() => {
        if (!userInfo.id) {
            dispatch(fetchUserInfoData()).then(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
        return () => {
            dispatch(dropRequestUserDataState());
        };
    }, []);

    useEffect(() => {
        if (updateProfileData.status === EStatusLoading.ERROR) {
            updateProfileData.errorMessage && message.error(updateProfileData.errorMessage, 2);
        }
        if (userInfoData.status === EStatusLoading.ERROR) {
            userInfoData.errorMessage && message.error(userInfoData.errorMessage, 2);
            setIsLoading(false);
        } else if (userInfoData.status === EStatusLoading.SUCCESS) {
            setIsLoading(false);
        }
    }, [userInfoData.status, updateProfileData.status]);

    const validateFormValues = (values: IUserProfileUpdateData) => {
        const errors = {} as IUserProfileUpdateData;
        Object.keys(values).forEach((key) => {
            let result = Validation(key, values[key]);
            if (result !== '') {
                errors[key] = result;
            }
        });
        return errors;
    };

    return (
        <Skeleton loading={isLoading}>
            <Row>
                <Col offset={8}>
                    <Title level={2}>Настройки профиля</Title>
                </Col>
            </Row>
            <Formik
                initialValues={userInfoData?.data}
                onSubmit={onSubmit}
                validateOnBlur={true}
                validate={validateFormValues}
                autoComplete={true}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 8 }}
                    initialValues={{ remember: true }}
                    onFinishFailed={onFinishFailed}
                    style={{ marginTop: 20 }}
                >
                    {Object.keys(EUserProfileFileds).map((key, index) => (
                        <Form.Item name={key} key={index} label={EUserProfileFileds[key]}>
                            <Input name={key} />
                        </Form.Item>
                    ))}
                    <Row className="button__group">
                        <Col>
                            <SubmitButton shape="round">Сохранить</SubmitButton>
                        </Col>
                        <Col>
                            <Button type="link" href={ProjectRoutes.profileDescription} shape="round">
                                Назад
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Formik>
        </Skeleton>
    );
};
