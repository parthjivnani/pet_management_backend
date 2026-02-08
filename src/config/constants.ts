export class Constants {
  public static readonly TIME_STAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss';
  public static readonly SUCCESS = 'Success';
  public static readonly FAIL = 'Fail';
  public static readonly FAIL_CODE = 400;
  public static readonly BAD_DATA = 'BAD_DATA';
  public static readonly CODE = 'CODE';
  public static readonly UPLOAD_SIZES = { PROFILE_PICTURE: 2000000 };
  public static readonly RECORDS_PER_PAGE = 20;
  public static readonly RANDOM_CODE_STR_LENGTH = 6;
  public static readonly DATE_FORMAT = 'YYYY-MM-DD HH:mm';
  public static readonly SES_API_VERSION = '';
  public static readonly SNS_API_VERSION = '2010-03-31';
  public static readonly DEVICE_TYPES = {
    IOS: 'ios',
  };
  public static readonly ROLES = {
    Admin: 1,
    SubAdmin: 2,
    User: 3,
  };
  public static readonly ROLESLUG = {
    ADMIN: 'admin',
    STORAGEUSER: 'storage-user',
    NETWORKOPERATOR: 'network-operator',
    NODEOPERATOR: 'node-operator',
  };
  public static readonly UPLOAD_TYPES = {
    PROFILE_PICTURE: 'PROFILE_PICTURE',
    AUDIO_FILE: 'AUDIO_FILE',
  };
  public static readonly TIME_FORMAT = 'HH:mm:ss';
  public static readonly EXPIRY_MINUTES = 5;
  public static readonly INTERNAL_SERVER = 500;
  public static readonly INTERNAL_SERVER_ERROR = 'internal server error';
  public static readonly INVALID_CREDENTIAL = 401;
  public static readonly NOT_FOUND = 404;
  public static readonly OK = 200;
  public static readonly CREATED = 201;
  public static readonly BAD_REQ = 400;
  public static readonly UNAUTHORIZED = 401;
  public static readonly FORBIDDEN = 403;
  public static readonly PRECONDITION_FAILED = 412;
  public static readonly SIGNUP_CODE = 420;
  public static readonly ETHER_VALUE = 10 ** 18;
  public static readonly PREMIUM_STORAGE_PRICE =
    'Premium - Storage Cost per month';
  public static readonly PREMIUM_BANDWIDTH_PRICE =
    'Premium - Bandwidth Cost per month';
  // public static readonly TB = 1099511627776;
  public static readonly TB = 1001000000000;
  public static readonly GB = 1000000000;
  public static readonly BASE10_CONVERSION_OF_GB_TO_BYTES = 1000;
  public static readonly MONTH_HOUR = 720;
  public static readonly CURRENT = 'current';
  public static readonly PREVIOUS = 'previous';
  public static readonly HISTORY = 'history';
  public static readonly NODE_PLAN_SLUG = 'node-plan';
  public static readonly NODE_STORAGE_UNITS_SLUG = 'node-storage-units';
  public static readonly NODE_BANDWIDTH_UNITS_SLUG = 'node-bandwidth-units';
  public static readonly NODE_STORAGE_PRICE_SLUG = 'node-storage-price';
  public static readonly NODE_BANDWIDTH_PRICE_SLUG = 'node-bandwidth-price';
  public static readonly NODE_PLAN_STORAGE = {
    plan_id: 1,
    planName: 'Premium - Storage Cost per month',
    units: 'TB',
    prices: 5,
  };
  public static readonly NODE_PLAN_BANDWIDTH = {
    plan_id: 1,
    planName: 'Premium - Bandwidth Cost per month',
    units: 'TB',
    prices: 5,
  };

  public static readonly DATAADDMESSAGE = 'Data Added Successfully';
  public static readonly DATAGETMESSAGE = 'Data Get Successfully';
  public static readonly UPDATEDATA = 'Data Updated';
  public static readonly FAIELUPDATEDATA = 'Data Not Updated';
  public static readonly DELETEDATA = 'Data Deleted Successfully';
  public static readonly FAILDELETEDATA = 'Data Not Deleted';
  public static readonly INVAILDID = 'INVAILD_ID';
  public static readonly SETTING_EXISTS = 'Setting Name Already Exists';
  public static readonly CATEGORY_EXISTS = 'Category Name Already Exists';
  public static readonly SUBSCRIPTION_EXISTS =
    'Subscription Name Already Exists';
  public static readonly UPDATE_STATUS_SUCCESS = 'Data Updated Successfully';
  public static readonly DELETE_RECORD_FAIL = 'Data Deleted Failed';
}
