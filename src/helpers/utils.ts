import * as fs from 'fs';
import * as mv from 'mv';
import * as crypto from 'crypto';
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
const syncLoop = require('sync-loop');
import * as path from 'path';
export default class Utils {
    /**
     * Authorise token from headers and return user id
    */
    public authToken = async (authorization: any) => {
        let userId: any;
        if (authorization && authorization.split(' ')[0] === 'Bearer') {
            jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET, (err, token) => {
                if (err) {

                } else {
                    userId = token?.id;
                }
            });
        }
        if (userId == undefined) {
            userId = 0;
        }

        return userId;
    }

    /**
    * uploadImage
    * To upload bulk image.
    * @param images - images: array, folder name: string.
    * @returns The array of uploaded images.
    */
    public uploadHeaderImage = (images: any[], foldername: string): Promise<{ imgArr: string[]; imageNewName: string[] }> => {
        return new Promise<{ imgArr: string[]; imageNewName: string[] }>(
            (resolve, reject) => {
                const imgArr: any = [];
                const imageNewName: string[] = [];
                const publicDir = `public/upload/${foldername}`;
                if (!fs.existsSync(publicDir)) {
                    fs.mkdirSync(publicDir);
                }
                for (const element of images) {
                    const timeStampInMs = new Date().getTime();
                    const oldpath = element.path;
                    const filename = `${timeStampInMs}_${element.originalname}`;
                    const newpath = `public/upload/${foldername}/${filename}`;
                    const imagePath = `${filename}`;
                    mv(oldpath, newpath, (err) => {
                        if (err) {
                            reject(err);
                        }
                        const imgObj = { [element.fieldname]: imagePath };
                        imgArr.push(imgObj);
                        imageNewName.push(element.originalname);
                        if (imgArr.length === images.length) {
                            resolve({ imgArr, imageNewName });
                        }
                    });
                }
            },
        );
    };

    public encryptPassword = (password) => {
        return bcrypt.hash(password, 10);
    };

    public uploadImage = (images: any, folderName: string, oldImageName: string = null): Promise<{ imgArr: string[]; imageNewName: string[] }> => {
        return new Promise<{ imgArr: string[]; imageNewName: string[] }>(
            (resolve, reject) => {
                const imgArr: string[] = [];
                const imageNewName: string[] = [];
                const publicDir = `public/upload/${folderName}`;
                if (!fs.existsSync(publicDir)) {
                    fs.mkdirSync(publicDir);
                }

                /* Delete Old image code */
                if (oldImageName) {
                    const oldImageWithPath = path.join(publicDir, oldImageName);
                    if (fs.existsSync(oldImageWithPath)) {
                        fs.unlinkSync(oldImageWithPath);
                    } 
                }
                /* END delete Old image code */

                for (const element of images) {
                    const timeStampInMs = new Date().getTime();
                    const oldpath = element.path;
                    const splitImage = element.originalname.split('.');
                    const imageName = splitImage[0].replace(/ +/g, "");
                    const imageExtention = splitImage[1];
                    const filename = `${imageName}_${timeStampInMs}.${imageExtention}`;
                    const newpath = `public/upload/${folderName}/${filename}`;
                    //const imagePath = `${process.env.IMAGE_UPLOAD_LOCAL}/${folderName}/${filename}`;
                    mv(oldpath, newpath, (err) => {
                        if (err) {
                            reject(err);
                        }
                        imgArr.push(filename);
                        imageNewName.push(element.originalname);
                        if (imgArr.length === images.length) {
                            resolve({ imgArr, imageNewName });
                        }
                    });
                }
            },
        );
    };

    //   public encryptPassword = (password) => {
    //     return bcrypt.hash(password, 10);
    //   };

    public generateRandomPassword = () => {
        const str =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
        const passwordLength = 10;
        const bytes = crypto.randomBytes(passwordLength);
        return Array.from(bytes, (byte) => str[byte % str.length]).join("");
    };

    public generateOTP = () => {
        const otp = Math.floor(Math.random() * 90000) + 10000;
        return otp;
    };

    public generateSlug = (str: string) => {
        if (typeof str !== 'string') {
            throw new Error('Input must be a string');
        }
        return str
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    };
    public async checkDBDependacy(arrTableFields, pkIds) {
        return new Promise((resolve, reject) => {
            if (Array.isArray(arrTableFields) && arrTableFields.length == 0) {
                resolve({ success: pkIds, error: [] });
            } else if (
                Array.isArray(arrTableFields) &&
                arrTableFields.length > 0 &&
                pkIds &&
                pkIds.length > 0
            ) {
                const successArr = [];
                const DependancyArr = [];
                // pkIds Loop
                syncLoop(pkIds.length, (pkIdsLoop) => {
                    const i = pkIdsLoop.iteration();
                    // arrTableFields Loop
                    syncLoop(arrTableFields.length, (arrTableFieldsLoop) => {
                        const j = arrTableFieldsLoop.iteration();
                        let whereObj = {};
                        whereObj = pkIds[i];
                        const Model = arrTableFields[i].tableName;
                        Model.findAll({ attributes: { exclude: ['id'] }, where: whereObj })
                            .then((data) => {
                                if (data.length == 0) {
                                    if (j == arrTableFields.length - 1) {
                                        successArr.push(pkIds[i]);
                                        if (i == pkIds.length - 1) {
                                            resolve({
                                                success: successArr,
                                                error: DependancyArr,
                                            }); // Final Output
                                        } else {
                                            pkIdsLoop.next(); // Move to First Loop
                                        }
                                    } else {
                                        arrTableFieldsLoop.next(); // Move to Second Loop
                                    }
                                } else {
                                    DependancyArr.push(pkIds[i]);
                                    if (i == pkIds.length - 1) {
                                        resolve({
                                            success: successArr,
                                            error: DependancyArr,
                                        }); // Final Output
                                    } else {
                                        pkIdsLoop.next(); // Move to First Loop
                                    }
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                                reject(err);
                            });
                    });
                });
            } else {
                resolve({ success: [], error: [] });
            }
        });
    }

}
