// types.ts


export interface MaxDemand {
  _id: string;
  year: number;
  month_name: string;
  unrestricted_demand: number;
  __v: number;
  createdAt: string;  
  updatedAt: string;  
}


export interface MaxDemandOfEachMonthEveryYear {
  _id: string;
  year: number;
  month_name: string;
  unrestricted_demand: number;
  __v: number;
}

export interface MaxDemandOfEveryMonth {
  _id: string;
  month_name: string;
  unrestricted_demand: number;
  __v: number;
}

export interface MaxDemandOfEveryYear {
  _id: string;
  year: number;
  unrestricted_demand: number;
  __v: number;
}

export interface SeasonalDemand {
  _id: string;
  year: number;
  season: string;
  unrestricted_demand: number;
  __v: number;
  createdAt: string;  
  updatedAt: string;  
}


export interface FallDemand {
  _id: string;
  year: number;
  unrestricted_demand: number;
  season: 'Fall';
  __v: number;
  createdAt: string;  
  updatedAt: string;  
}

export interface WinterDemand {
  _id: string;
  year: number;
  unrestricted_demand: number;
  season: 'Winter';
  __v: number;
  createdAt: string; 
  updatedAt: string;  
}

export interface SpringDemand {
  _id: string;
  year: number;
  unrestricted_demand: number;
  season: 'Spring';
  __v: number;
  createdAt: string;  
  updatedAt: string;  
}

export interface SummerDemand {
  _id: string;
  year: number;
  unrestricted_demand: number;
  season: 'Summer';
  __v: number;
  createdAt: string;  
  updatedAt: string; 
}

export interface AllDayData {
  _id: string;
  date: string; 
  time: string; 
  total: number;
  import_from_the_grid: number;
  schedule_from_the_grid: number;
  'od-ud': number;
  demand_med: number;
  shedding: number;
  unrestricted_demand: number;
  datetime: string; 
  month: number; 
  __v: number;
}


export interface PowerConsumptionGraphData {
  _id: string;           
  year: number;          
  month: number;        
  import_from_the_grid: number; 
  schedule_from_the_grid: number;  
  od_ud: number;         // Overdraw/Underdraw (od-ud)
  demand_med: number;    // Demand in MWh
  __v: number;           
}


export interface PowerConsumptionsBasedOnPublicHolidays {
  _id: string;           
  date: string;         
  unrestricted_demand: number;  
  month: number;        
  festivals: string;     // Name of the festival/holiday
  __v: number;           
}

export interface PowerConsumptionsBasedOnWeatherData {
  _id: string;           
  year: number;          
  season: string;        
  unrestricted_demand: number;  
  __v: number;           
}

export interface PowerFurtherRequiredFromSolarEnergy {
  _id: string;           
  date: string;         
  "od-ud": number; // Update to match the actual property name
  month: number;        
  __v: number;           
}

export interface InfrastructureData {
  _id: string;
  Year: string;
  Domestic: number;
  Commercial: number;
  Industrial: number;
  Street_Lighting: number;
  Others: number;
  Total: number;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

