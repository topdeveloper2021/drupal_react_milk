import Paragraph, { ParagraphInterface } from './Paragraph';
import {DrupalJsonApiParams} from 'drupal-jsonapi-params';

export interface ParagraphPeopleInterface extends ParagraphInterface {
  id: string;
  admin_title: string;
  field_section_header?: string;
  field_type_of_people: string;
  field_view_mode: string;
  field_centers?: any;
  field_teams?: any;
}

export default class ParagraphPeople
  extends Paragraph
  implements ParagraphPeopleInterface {
  id: string;
  admin_title: string;
  field_section_header: string;
  field_type_of_people: string;
  field_view_mode: string;
  field_centers: any;
  field_teams: any;
  private _content_list_query: string;

  constructor(incoming: ParagraphPeopleInterface) {
    super(incoming);
    Object.assign(this, incoming);
  }

  public static getIncluded(): string {
    
    return "";
  }

  get content_list_query(): string {
    this.buildContentListQuery();
    return this._content_list_query;
  }

  buildContentListQuery() {
    const apiParams = new DrupalJsonApiParams();

    let filterCenters = (
      this.field_centers !== undefined && 
      this.field_centers?.id !== undefined && 
      this.field_centers?.id !== null)
      ? this.field_centers.id
      : null;

    let filterTeams = (
      this.field_teams !== undefined && 
      this.field_teams?.id !== undefined && 
      this.field_teams?.id !== null)
      ? this.field_teams.id
      : null;

    apiParams
      .addInclude(['field_photo'])
      .addGroup('tag-group', 'AND')
      .addSort('field_last_name');

    if (filterCenters != null){
      apiParams.addFilter('field_centers.id', filterCenters, '=', 'tag-group');
    }

    if (filterTeams != null){
      apiParams.addFilter('field_teams.id', filterTeams, '=', 'tag-group');
    }

    const queryString = apiParams.getQueryString({ encode: false });

    let jsonapiPath = '/jsonapi/people/' + this.field_type_of_people;
    let jsonapiAttributes = '?jsonapi_include=true&include=field_photo&';

    this._content_list_query = jsonapiPath + jsonapiAttributes + queryString;
  }
}
