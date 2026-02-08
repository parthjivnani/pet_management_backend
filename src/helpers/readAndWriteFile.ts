import { promises as fs } from 'fs';
import { ResponseBuilder } from './responseBuilder';
export default class ReadAndWriteFile {
    private responseBuilder: ResponseBuilder;
  
    constructor() {
        this.responseBuilder = new ResponseBuilder();
      }
  /*
   * getAuthToken
   */
  private cssFilePath = `public/css/global.css`;
  public async readWrtieFile(  req: any,
    res: any,){
    try {
        const content = await fs.readFile(this.cssFilePath, 'utf8');
        return this.responseBuilder.responseContent(
            res,
            200,
            false,
            content
          );
      } catch (err) {
        return this.responseBuilder.responseContent(
            res,
            500,
            false,
            'something is happend'
          );
      }
  };

  public async writeCssFile (
    req: any,
    res: any,
  ) {
    const content = req.body.content;
      try {
        await fs.writeFile(this.cssFilePath, content);
        return this.responseBuilder.responseContent(
            res,
            200,
            false,
            'File written/overwritten successfully.'
          );
      
      } catch (err) {
        return this.responseBuilder.responseContent(
            res,
            500,
            false,
            'something is happend'
          );
      }
  };

}
