export interface NodeProgramDayInterface {
    field_grid_event_id: string;
    field_program_date: string;
}

export default class NodeProgramDay implements NodeProgramDayInterface {
    field_grid_event_id: string;
    field_program_date: string;

    constructor(props: NodeProgramDayInterface) {
        Object.assign(this, props);
    }
}
