export interface FilterColumn {
  name: string;
  colType: COL_TYPE;
  data: any[];
}

export interface FilterOption {
  colType: COL_TYPE;
  filterSelection: any;
}

export enum COL_TYPE {
  "string" = "string",
  "date" = "date",
  "unique" = "unique",
  "number" = "number",
  "boolean" = "boolean",
  "image" = "image",
}

enum NUMBER_FILTER_TYPE {
  "equals" = "equals",
  "greater_than" = "greater_than",
  "less_than" = "less_than",
  "between" = "between",
}

enum STRING_FILTER_TYPE {
  "equals" = "equals",
  "contains" = "contains",
  "starts_with" = "starts_with",
  "ends_with" = "ends_with",
  "does_not_contain" = "does_not_contain",
  "is_blank" = "is_blank",
}

enum DATE_FILTER_TYPE {
  "equals" = "equals",
  "between" = "between",
  "yesterday" = "yesterday",
  "today" = "today",
  "tomorrow" = "tomorrow",
  "last_week" = "last_week",
  "last_X_days" = "last_x_days",
}

//filter options
/*
    number: 
    equals
    greater than
    less than
    between
    
    string :
    contains
    starts with
    begins with
    ends with
    does not contain
    equals
    
    */
