export type Vehicles = {
    Year:                number;
    Make:                string;
    Model_Trim:          string;
    Options:             Option[];
};
export type GetParams = {
    year:                number;
    make:                string;
    modelTrim:           string;
}
export type Option = {
    Drivetrain?:         string;
    Engine:              string;
    Transmission?:       string;
    Max_Towing_Capacity: number;
    Notes:               string;
}

