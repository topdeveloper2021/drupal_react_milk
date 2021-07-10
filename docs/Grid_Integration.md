===

# Grid Integration #

Data from the in-house grid system is imported to Drupal custom ECK objects. The keys to those objects are decided by
the GRID database. The basic kernal of grid data is the event. Everything relates to the Event entity type and its
various bundles. The primary foreign key that's used to unite event information is field_grid_event_id.

```json

{
        "type": "event--conference",
        "id": "45575c1d-5957-42fa-a685-3c20b6057f19",
        "links": {
            "self": {
                "href": "http:\/\/localhost:8080\/jsonapi\/event\/conference\/45575c1d-5957-42fa-a685-3c20b6057f19"
            }
        },
        "drupal_internal__id": 146,
        "langcode": "en",
        "title": "Global Conference 2000",
        "created": "2005-10-21T10:30:22+00:00",
        "changed": "2005-10-21T10:30:22+00:00",
        "default_langcode": true,
        "metatag": null,
        "field_blurb": null,
        "field_campaign_id": null,
        "field_campaign_name": null,
        "field_campaign_owner": null,
        "field_campaign_type": null,
        "field_campaign_type_public": null,
        "field_description": {
            "value": "\u003CP\u003E\r\nMore than 1,000 leaders in business and finance, academia, public policy and media, joined a prestigious lineup of speakers at the third annual Milken Institute 2000 Global Conference. \u003CP\u003E\r\n\r\nThe event opened Wednesday evening, March 8, with the Conference\u0027s signature event \u0026mdash; a panel of Nobel Laureates in Economic Science moderated by Institute Chairman Michael Milken. It continued Thursday and Friday with more than two dozen panels on technology, economics, regional outlooks and much more. \u003CP\u003E\r\n\r\nThis year\u0027s event was the Institute\u0027s biggest yet, with 27 panels over three days and more than 120 speakers, including some of the world\u0027s leading business and finance executives and scholars. The focus of this year\u0027s conference was technology and its impact on the way we do business. \u003CP\u003E\r\n\r\nThe 2000 conference was our largest yet \u0026mdash; with more than 1,400 institutional investors, business and financial leaders, academicians and senior government policy officials from all over the globe were in attendence. \u003CP\u003E\r\nGo to the \u003Ca href=\u0022\/events\/events.taf?function=show\u0026ID=79\u0026cat=allconf\u0026EventID=GC00\u0026level1=program\u0022\u003Eprogram\u003C\/a\u003E page to view panel summaries.",
            "format": "full_html",
            "processed": "\u003Cp\u003E\nMore than 1,000 leaders in business and finance, academia, public policy and media, joined a prestigious lineup of speakers at the third annual Milken Institute 2000 Global Conference. \u003C\/p\u003E\u003Cp\u003E\n\nThe event opened Wednesday evening, March 8, with the Conference\u0027s signature event \u2014 a panel of Nobel Laureates in Economic Science moderated by Institute Chairman Michael Milken. It continued Thursday and Friday with more than two dozen panels on technology, economics, regional outlooks and much more. \u003C\/p\u003E\u003Cp\u003E\n\nThis year\u0027s event was the Institute\u0027s biggest yet, with 27 panels over three days and more than 120 speakers, including some of the world\u0027s leading business and finance executives and scholars. The focus of this year\u0027s conference was technology and its impact on the way we do business. \u003C\/p\u003E\u003Cp\u003E\n\nThe 2000 conference was our largest yet \u2014 with more than 1,400 institutional investors, business and financial leaders, academicians and senior government policy officials from all over the globe were in attendence. \u003C\/p\u003E\u003Cp\u003E\nGo to the \u003Ca href=\u0022\/events\/events.taf?function=show\u0026amp;ID=79\u0026amp;cat=allconf\u0026amp;EventID=GC00\u0026amp;level1=program\u0022\u003Eprogram\u003C\/a\u003E page to view panel summaries.\u003C\/p\u003E"
        },
        "field_event_date": "2000-03-08",
        "field_grid_event_id": "GC00",
        "field_name_short": null,
        "field_published": true,
        "field_registration_deadline": null,
        "field_sequential_id": 79,
        "field_speakers": null,
        "field_venue": "The Beverly Hilton Hotel\u003CBR\u003E\r\nBeverly Hills, California",
        "event_type": {
            "type": "event_type--event_type",
            "id": "1eac1538-d334-4e6a-a5ca-082336f6c4a9"
        },
        "field_hero_image": {
            "data": null,
            "links": {
                "related": {
                    "href": "http:\/\/localhost:8080\/jsonapi\/event\/conference\/45575c1d-5957-42fa-a685-3c20b6057f19\/field_hero_image"
                },
                "self": {
                    "href": "http:\/\/localhost:8080\/jsonapi\/event\/conference\/45575c1d-5957-42fa-a685-3c20b6057f19\/relationships\/field_hero_image"
                }
            }
        },
        "field_tracks": {
            "data": [],
            "links": {
                "related": {
                    "href": "http:\/\/localhost:8080\/jsonapi\/event\/conference\/45575c1d-5957-42fa-a685-3c20b6057f19\/field_tracks"
                },
                "self": {
                    "href": "http:\/\/localhost:8080\/jsonapi\/event\/conference\/45575c1d-5957-42fa-a685-3c20b6057f19\/relationships\/field_tracks"
                }
            }
        }
    }

```
