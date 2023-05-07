import { Tooltip, VisuallyHidden } from '@chakra-ui/react';

function TooltipInfo(props: any) {

    return (
        <Tooltip
            isOpen={props.isOpen}
            onClose={props.onClose}
            label={props.status}
            placement="right"
        >
            <VisuallyHidden>This will be hidden</VisuallyHidden>
        </Tooltip>
    );
}

export default TooltipInfo;

