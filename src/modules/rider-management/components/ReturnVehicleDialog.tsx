import FlexDialog from '@/modules/ui/components/FlexDialog';
import FlexButton from '@/modules/ui/components/FlexButton';
import React from 'react';

interface ReturnVehicleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isReturningVehicle: boolean;
}

const ReturnVehicleDialog: React.FC<ReturnVehicleDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isReturningVehicle,
}) => {
  return (
    <FlexDialog isOpen={isOpen} onClose={onClose} title="Return Vehicle">
      <div className="space-y-4">
        <div className="p-4  rounded-lg">
          <p className="text-gray-600">
            Are you sure you want to return this vehicle?
          </p>
        </div>
        <div className="flex justify-end gap-3">
          <FlexButton
            text="Cancel"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isReturningVehicle}
          />
          <FlexButton
            text="Confirm"
            variant="primary"
            size="sm"
            onClick={onConfirm}
            loading={isReturningVehicle}
          />
        </div>
      </div>
    </FlexDialog>
  );
};

export default ReturnVehicleDialog;
