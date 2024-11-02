import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

import * as strings from 'AiCarouselWebPartStrings';
import AiCarousel from './components/AiCarousel';
import { IAiCarouselProps , ISPCarousel } from './components/IAiCarouselProps';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export interface IAiCarouselWebPartProps {
  description: string;
}



export default class AiCarouselWebPart extends BaseClientSideWebPart<IAiCarouselWebPartProps> {

  public async onInit(): Promise<void> {
    console.log('onInit called');
    await super.onInit();
    console.log('onInit finished');
  }

  public async getBannerConfiguration(): Promise<ISPCarousel[]> {
    const requestUrl = `${this.context.pageContext.web.absoluteUrl}/_api/web/Lists/GetByTitle('${this.properties.description}')/Items`;
    console.log('Fetching list data from:', requestUrl);

    const response: SPHttpClientResponse = await this.context.spHttpClient.get(requestUrl, SPHttpClient.configurations.v1);
    const data = await response.json();
    console.log('Data fetched:', data);
    return data.value;  // Adjust according to your API response structure
  }

  public render(): void {
    console.log('render called');
    if (!this.domElement) {
      console.error('domElement is not available');
      return;
    }
    if(this.domElement) this.renderContent();
  }





  protected async renderContent(): Promise<void> {
    try {
      const bannerData = await this.getBannerConfiguration();
      console.log('Banner data:', bannerData);


 const sortByColumn = <T, K extends keyof T>(arr: T[], columnName: K) => {
  return [...arr].sort((a, b) => {
    // Assuming the column values are strings; adjust the comparison accordingly
    if (a[columnName] < b[columnName]) return -1;
    if (a[columnName] > b[columnName]) return 1;
    return 0;
  });
 };
      // check active item
      const activeItems = bannerData.filter(item => item.Active === true);
      
      // sort data according there order
       var sortitems = sortByColumn(activeItems, "OrderBy");


      const element: React.ReactElement<IAiCarouselProps> = React.createElement(
        AiCarousel,
        {
          description: this.properties.description,
          bannerData: sortitems  // Pass the fetched data to the AiCarousel component
        }
      );

      const domElement = document.querySelector('[data-sp-web-part-id="cfb9679b-8767-4c91-be30-3b800a6df671"]');
      console.log("Dom element ---->", domElement)
      console.log("element ---->", element);

      if (domElement) {
        ReactDom.render(element, domElement);
      } else {
        console.error('The specified DOM element is not found.');
      }
    } catch (error) {
      console.error('Error during render:', error);
    }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
