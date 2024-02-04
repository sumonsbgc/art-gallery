import React, { useEffect, useState } from 'react';
import Swal, { SweetAlertIcon } from 'sweetalert2';

// slate
import { Descendant } from 'slate';

// components
import { TextEditor } from '@/components/common';
import { Icon } from '@/components/ui';
import { initText } from '@/components/common/TextEditor';

// redux
import { useUpdatePaymentDetailsMutation } from '@/redux/features/auth/authApi';
import { UserData } from '@/redux/features/auth/auth.types';

type BillingSettingsProps = {
  user: UserData;
};

const BillingSettings = ({ user }: BillingSettingsProps) => {
  const [updatePaymentDetails] = useUpdatePaymentDetailsMutation();
  const [value, setValue] = useState<Descendant[]>(JSON.parse(user.payment_detail) || initText);

  const handleUpdatePaymentDetails = async (_value: Descendant[]) => {
    try {
      setValue(_value);
      const formData = new FormData();
      formData.append('payment_detail', JSON.stringify(_value));

      const res: any = await updatePaymentDetails(formData);

      let icon: SweetAlertIcon = 'error';
      let text: string = res?.error?.data?.message || 'Something Went Wrong';

      if (res?.data?.status == 'success') {
        icon = 'success';
        text = res?.data?.message || 'Account Details Updated Successfully';
      }

      Swal.fire({ icon, text, customClass: { confirmButton: '!bg-orange w-[140px]' } });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setValue(JSON.parse(user.payment_detail) || initText);
  }, [user.payment_detail]);
  return (
    <div className="w-full max-w-[487px]">
      <h3 className="text-black text-xl font-medium uppercase leading-tight">
        Add your account information
      </h3>

      <TextEditor
        value={value}
        onChange={(newValue) => setValue(newValue)}
        className="w-full h-[181px] p-2.5 border border-black border-opacity-20 text-black text-sm font-normal bg-transparent my-[18px]"
        placeholder="e.g. bank name, account type, routing name, or any card number..."
      />

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => handleUpdatePaymentDetails(value)}
          className="h-[46px] px-8 py-3 justify-center items-center flex text-center text-white text-sm font-medium leading-normal bg-orange"
        >
          {JSON.stringify(value) !== JSON.stringify(initText)
            ? 'Update Account Details'
            : 'Save Account Details'}
        </button>

        {JSON.stringify(value) !== JSON.stringify(initText) && (
          <button
            type="button"
            onClick={() => handleUpdatePaymentDetails(initText)}
            className="flex items-center justify-center p-[10px] rounded-full bg-orange bg-opacity-20"
          >
            <Icon name="delete" size="22" color="orange" />
          </button>
        )}
      </div>
    </div>
  );
};

export default BillingSettings;
