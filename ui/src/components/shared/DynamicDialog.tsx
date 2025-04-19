import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export type DialogAction = 'cancel' | 'confirm' | 'custom';

interface DialogButton {
    label: string;
    action: DialogAction | string;
    variant?: 'text' | 'outlined' | 'contained';
    color?: 'primary' | 'secondary' | 'error';
}

interface DynamicDialogProps {
    open: boolean;
    title?: string;
    data?:any;
    content?: React.ReactNode | string | any;
    buttons?: DialogButton[];
    onClose: (action: string) => void;
}

const DynamicDialog: React.FC<DynamicDialogProps> = ({
    open,
    title,
    data,
    content,
    buttons = [
        { label: 'Close', action: 'cancel', variant: 'outlined', color: 'primary' },
    ],
    onClose,
}) => {

    return (
        <React.Fragment>
            <Dialog open={open} onClose={() => onClose('cancel')}>
                {title && <DialogTitle>{title}</DialogTitle>}
                <IconButton
                    aria-label="close"
                    onClick={() => onClose('cancel')}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                {content && (
                    <DialogContent>
                        {typeof content === 'string' ? (
                            <Typography>{content}</Typography>
                        ) : (
                            content
                        )}
                    </DialogContent>
                )}
                <DialogActions>
                    {buttons.map((btn, idx) => (
                        <Button
                            key={idx}
                            variant={btn.variant || 'text'}
                            color={btn.color || 'primary'}
                            onClick={() => onClose(btn.action)}
                        >
                            {btn.label}
                        </Button>
                    ))}
                </DialogActions>
            </Dialog>

            {/* <BootstrapDialog
                onClose={onClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Modal title
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => onClose('cancel')}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    {data?.firstName}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => { onClose('save') }}>
                        OK
                    </Button>
                    <Button autoFocus onClick={() => { onClose('cancel') }}>
                        Cancel
                    </Button>
                </DialogActions>
            </BootstrapDialog> */}
        </React.Fragment>
    );
}

export default DynamicDialog;
