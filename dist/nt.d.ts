export default class NT {
    private rio_ip;
    private team_number;
    private client;
    private connected;
    private onCalls;
    private robot;
    private profileData;
    constructor(autoConnect?: boolean, teamNumber?: string);
    connect(): void;
    isConnected(): boolean;
    private internalConnect;
    private internalDisconnect;
    getRobotName(): string;
    getProfileName(): string;
    getProfileData(): any;
    on(name: string, func: any): void;
    getValue(key: string): string;
}
