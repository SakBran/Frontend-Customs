'use client';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import { Post, Put } from '@/app/_services/BasicHttpServices';
import Swal from 'sweetalert2';

export interface FormData {
    id: string;
    sourceFolder: string;
    completeFolder: string;
    toReadFileName: string;
    toReadFileNameStartWith: string;
    CEIRID: string;
    RONo: string;
    RODate: string;
    CD: string;
    CT: string;
    AT: string;
    RF: string;
    AuthorizationTokenURL_CEIR: string;
    PaymentConfirmationURL_CEIR: string;
}

const SystemSettingForm: React.FC<{ onLoadData?: FormData }> = ({ onLoadData }) => {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<FormData>();

    useEffect(() => {
        if (onLoadData) {
            Object.entries(onLoadData).forEach(([key, value]) => {
                setValue(key as keyof FormData, value);
            });
        }
    }, [onLoadData, setValue]);

    const onSubmit = (data: FormData) => {
        console.log(data);
        const processedData = async () => {
            let response;
            if (data && data.id) {
                response = await Put(`SystemSetting`, data.id, data);
            } else {
                response = await Post('SystemSetting', data);
            }

            if (!response) {
                const errorData = await response;
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errorData.toString()
                });
                return;
            }

            if (data && data.id) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Setting updated successfully'
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Setting created successfully'
                });
            }
        };
        processedData();
    };

    const getFormErrorMessage = (name: keyof FormData) => {
        return errors[name] ? <small className="p-error">{errors[name]?.message}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <div className="p-fluid">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="sourceFolder">Source Folder</label>
                    <Controller name="sourceFolder" control={control} rules={{ required: 'Source Folder is required.' }} render={({ field }) => <InputText id={field.name} {...field} className={classNames({ 'p-invalid': errors.sourceFolder })} />} />
                    {getFormErrorMessage('sourceFolder')}
                </div>

                <div className="field">
                    <label htmlFor="completeFolder">Complete Folder</label>
                    <Controller
                        name="completeFolder"
                        control={control}
                        rules={{ required: 'Complete Folder is required.' }}
                        render={({ field }) => <InputText id={field.name} {...field} className={classNames({ 'p-invalid': errors.completeFolder })} />}
                    />
                    {getFormErrorMessage('completeFolder')}
                </div>

                <div className="field">
                    <label htmlFor="toReadFileName">To Read File Name</label>
                    <Controller name="toReadFileName" control={control} rules={{ required: 'This field is required.' }} render={({ field }) => <InputText id={field.name} {...field} className={classNames({ 'p-invalid': errors.toReadFileName })} />} />
                    {getFormErrorMessage('toReadFileName')}
                </div>

                <div className="field">
                    <label htmlFor="toReadFileNameStartWith">File Name Starts With</label>
                    <Controller
                        name="toReadFileNameStartWith"
                        control={control}
                        rules={{ required: 'This field is required.' }}
                        render={({ field }) => <InputText id={field.name} {...field} className={classNames({ 'p-invalid': errors.toReadFileNameStartWith })} />}
                    />
                    {getFormErrorMessage('toReadFileNameStartWith')}
                </div>

                <div className="field">
                    <label htmlFor="CEIRID">CEIR ID</label>
                    <Controller name="CEIRID" control={control} rules={{ required: 'CEIR ID is required.' }} render={({ field }) => <InputText id={field.name} {...field} className={classNames({ 'p-invalid': errors.CEIRID })} />} />
                    {getFormErrorMessage('CEIRID')}
                </div>

                <div className="field">
                    <label htmlFor="RONo">RO No</label>
                    <Controller name="RONo" control={control} rules={{ required: 'RO No is required.' }} render={({ field }) => <InputText id={field.name} {...field} className={classNames({ 'p-invalid': errors.RONo })} />} />
                    {getFormErrorMessage('RONo')}
                </div>

                <div className="field">
                    <label htmlFor="RODate">RO Date</label>
                    <Controller name="RODate" control={control} rules={{ required: 'RO Date is required.' }} render={({ field }) => <InputText id={field.name} {...field} className={classNames({ 'p-invalid': errors.RODate })} />} />
                    {getFormErrorMessage('RODate')}
                </div>

                <div className="field">
                    <label htmlFor="CD">CD</label>
                    <Controller name="CD" control={control} rules={{ required: 'CD is required.' }} render={({ field }) => <InputText id={field.name} {...field} className={classNames({ 'p-invalid': errors.CD })} />} />
                    {getFormErrorMessage('CD')}
                </div>

                <div className="field">
                    <label htmlFor="CT">CT</label>
                    <Controller name="CT" control={control} rules={{ required: 'CT is required.' }} render={({ field }) => <InputText id={field.name} {...field} className={classNames({ 'p-invalid': errors.CT })} />} />
                    {getFormErrorMessage('CT')}
                </div>

                <div className="field">
                    <label htmlFor="AT">AT</label>
                    <Controller name="AT" control={control} rules={{ required: 'AT is required.' }} render={({ field }) => <InputText id={field.name} {...field} className={classNames({ 'p-invalid': errors.AT })} />} />
                    {getFormErrorMessage('AT')}
                </div>

                <div className="field">
                    <label htmlFor="RF">RF</label>
                    <Controller name="RF" control={control} rules={{ required: 'RF is required.' }} render={({ field }) => <InputText id={field.name} {...field} className={classNames({ 'p-invalid': errors.RF })} />} />
                    {getFormErrorMessage('RF')}
                </div>

                <div className="field">
                    <label htmlFor="AuthorizationTokenURL_CEIR">Authorization Token URL</label>
                    <Controller
                        name="AuthorizationTokenURL_CEIR"
                        control={control}
                        rules={{ required: 'This field is required.' }}
                        render={({ field }) => <InputText id={field.name} {...field} className={classNames({ 'p-invalid': errors.AuthorizationTokenURL_CEIR })} />}
                    />
                    {getFormErrorMessage('AuthorizationTokenURL_CEIR')}
                </div>

                <div className="field">
                    <label htmlFor="PaymentConfirmationURL_CEIR">Payment Confirmation URL</label>
                    <Controller
                        name="PaymentConfirmationURL_CEIR"
                        control={control}
                        rules={{ required: 'This field is required.' }}
                        render={({ field }) => <InputText id={field.name} {...field} className={classNames({ 'p-invalid': errors.PaymentConfirmationURL_CEIR })} />}
                    />
                    {getFormErrorMessage('PaymentConfirmationURL_CEIR')}
                </div>

                <Button type="submit" label="Submit" className="mt-2" />
            </form>
        </div>
    );
};

export default SystemSettingForm;
