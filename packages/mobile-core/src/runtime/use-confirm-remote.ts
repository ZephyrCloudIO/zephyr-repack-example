import { QueryClient, useQuery } from "@tanstack/react-query";
import { constants, ze_values, ZE_VALUES, Constants } from "./constants";
import { Snapshot } from "zephyr-edge-contract";
// import { moduleFederationPlugin} from "@module-federation/core"

interface ModuleFederationType {
    name: string;
    filename: string;
    version: string;
    remoteType: string;
    remotes: Record<string, string>;
    exposes: Record<string, string>;
    shared: Record<string, string>;

}

interface ConfirmUpdateResponse {
    updated: boolean;
    latest_snapshot: Snapshot;
}

// export function useRemote<T>(queryKey: string, queryFn: () => Promise<T>) {
//     return useQuery({ queryKey, queryFn });
// }

interface ConfirmUpdateOptions {
    tag?: string;
    remote_url?: string;
}

export class ZephyrSdk {
    private queryClient: QueryClient;
    private options: any;
    private constants: Constants;
    private ze_values: ZE_VALUES = ze_values;
    private ze_edge_url: string = process.env.ZE_EDGE_URL || ZE_EDGE_URL;
    private ze_app_uid: string = process.env.ZE_APP_UID || ZE_APP_UID;
    private ze_snapshot_id: string = process.env.ZE_SNAPSHOT_ID || ZE_SNAPSHOT_ID;
    private runtime_api_url: string = process.env.ZE_RUNTIME_API_URL || ZE_EDGE_URL;
    private ze_updated_at: string = process.env.ZE_UPDATED_AT || ZE_UPDATED_AT;
    private ze_build_id: string = process.env.ZE_BUILD_ID || ZE_BUILD_ID;
    private mf_config: ModuleFederationType = process.env.MF_CONFIG || MF_CONFIG;

    constructor() {
        this.queryClient = new QueryClient();
    }



    async confirmUpdate(options: ConfirmUpdateOptions): Promise<ConfirmUpdateResponse> {
        return this.queryClient.fetchQuery({
            queryKey: [this.constants.confirm_update],
            queryFn: () => {
                return fetch(`${this.runtime_api_url}${this.constants.confirm_update}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'x-ze-app-uid': this.app_uid,
                        'x-ze-build-id': this.ze_build_id,
                        'x-ze-updated-at': this.ze_updated_at,
                    }
                });
            }
        });
    }

    public verifyValues() {
        console.log('this.ze_values', this.ze_values);
    }
}