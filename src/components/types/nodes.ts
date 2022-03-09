import { ReactElement } from "react";

export type NodeStat = {
    title: string;
    text: string | number;
    icon: ReactElement;
};

export interface Cards {
    label: string,
    value: string | number,
    icon: ReactElement,
}

export interface StackIProps {
    client: string,
    nodeId: string,
    nodeName: string,
    enode: string,
    rpcUrl: string,
    ip: string,
    showPending: boolean
}