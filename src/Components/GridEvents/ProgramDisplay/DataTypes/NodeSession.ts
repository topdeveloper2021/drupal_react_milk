export interface NodeSessionFieldStartEndInterface {
    value: string;
    end_value: string;
}

export interface NodeSessionInterface {
    title: string;
    field_long_description: string;
    field_private: boolean;
    field_short_summary: string;
    field_start_end: NodeSessionFieldStartEndInterface;
    field_url: string;
    field_event: NodeEventInterface;
    field_people: Array<any>;
    field_speakers: Array<any>;
    field_moderator: any;
    field_tracks: Array<any>;
}

export interface NodeEventInterface {
    field_event_date: string;
    field_grid_event_id: string;
    field_name_short: string;
}

export default class NodeSession implements NodeSessionInterface {
    title: string;
    field_long_description: string;
    field_private: boolean;
    field_short_summary: string;
    field_start_end: NodeSessionFieldStartEndInterface;
    field_url: string;
    field_event: any;
    field_speakers: Array<any>;
    field_moderator: any;
    field_people: Array<any>;
    field_tracks: Array<any>;

    constructor(props: NodeSessionInterface) {
        Object.assign(this, props);
    }
}
