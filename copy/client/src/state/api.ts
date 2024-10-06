import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  MaxDemand,
  MaxDemandOfEachMonthEveryYear,
  MaxDemandOfEveryMonth,
  MaxDemandOfEveryYear,
  SeasonalDemand,
  FallDemand,
  WinterDemand,
  SpringDemand,
  SummerDemand,
  AllDayData,
  PowerConsumptionGraphData,
  PowerConsumptionsBasedOnPublicHolidays,
  PowerConsumptionsBasedOnWeatherData,
  PowerFurtherRequiredFromSolarEnergy,
  InfrastructureData
} from './types';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: 'main',
  tagTypes: [
    'MaxDemand',
    'MaxDemandOfEachMonthEveryYear',
    'MaxDemandOfEveryMonth',
    'MaxDemandOfEveryYear',
    'SeasonalDemand',
    'FallDemand',
    'WinterDemand',
    'SpringDemand',
    'SummerDemand',
    'AllDayData',
    'PowerConsumptionGraphData',
    'PowerConsumptionsBasedOnPublicHolidays',
    'PowerConsumptionsBasedOnWeatherData',
    'PowerFurtherRequiredFromSolarEnergy',
    'InfrastructureData'
  ],
  endpoints: (build) => ({
    getMaxDemand: build.query<MaxDemand, void>({
      query: () => `maxdemand/alltimemaxdemanddata/`,
      providesTags: ['MaxDemand'],
    }),
    getMaxDemandOfEachMonthEveryYear: build.query<MaxDemandOfEachMonthEveryYear, void>({
      query: () => `kpi/maxdemandofeachmontheveryyear/`,
      providesTags: ['MaxDemandOfEachMonthEveryYear'],
    }),
    getMaxDemandOfEveryMonth: build.query<MaxDemandOfEveryMonth, void>({
      query: () => `kpi/maxdemandofeverymonth/`,
      providesTags: ['MaxDemandOfEveryMonth'],
    }),
    getMaxDemandOfEveryYear: build.query<MaxDemandOfEveryYear, void>({
      query: () => `kpi/maxdemandofeveryyear/`,
      providesTags: ['MaxDemandOfEveryYear'],
    }),
    getSeasonalDemand: build.query<SeasonalDemand, void>({
      query: () => `seasondemand/seasonsalldata/`,
      providesTags: ['SeasonalDemand'],
    }),
    getFallDemand: build.query<FallDemand, void>({
      query: () => `seasondemand/season/Fall/`,
      providesTags: ['FallDemand'],
    }),
    getWinterDemand: build.query<WinterDemand, void>({
      query: () => `seasondemand/season/Winter/`,
      providesTags: ['WinterDemand'],
    }),
    getSpringDemand: build.query<SpringDemand, void>({
      query: () => `seasondemand/season/Spring/`,
      providesTags: ['SpringDemand'],
    }),
    getSummerDemand: build.query<SummerDemand, void>({
      query: () => `seasondemand/season/Summer/`,
      providesTags: ['SummerDemand'],
    }),
    getAllDayData: build.query<AllDayData[], void>({
      query: () => `alldaydata/`,
      providesTags: ['AllDayData'],
    }),
    getPowerConsumptionGraphData: build.query<PowerConsumptionGraphData[], void>({
      query: () => `graphdata/power-consumption-graph/`,
      providesTags: ['PowerConsumptionGraphData'],
    }),
    getPowerConsumptionsBasedOnPublicHolidays: build.query<PowerConsumptionsBasedOnPublicHolidays[], void>({
      query: () => `graphdata/power-public-holidays/`,
      providesTags: ['PowerConsumptionsBasedOnPublicHolidays'],
    }),
    getPowerConsumptionsBasedOnWeatherData: build.query<PowerConsumptionsBasedOnWeatherData[], void>({
      query: () => `graphdata/power-weather/`,
      providesTags: ['PowerConsumptionsBasedOnWeatherData'],
    }),
    getPowerFurtherRequiredFromSolarEnergy: build.query<PowerFurtherRequiredFromSolarEnergy[], void>({
      query: () => `graphdata/power-solar/`,
      providesTags: ['PowerFurtherRequiredFromSolarEnergy'],
    }),
    getInfrastructureData: build.query<InfrastructureData[], void>({
      query: () => `infrastructure/`,
      providesTags: ['InfrastructureData'],
    }),
  }),
});

export const {
  useGetMaxDemandQuery,
  useGetMaxDemandOfEachMonthEveryYearQuery,
  useGetMaxDemandOfEveryMonthQuery,
  useGetMaxDemandOfEveryYearQuery,
  useGetSeasonalDemandQuery,
  useGetFallDemandQuery,
  useGetWinterDemandQuery,
  useGetSpringDemandQuery,
  useGetSummerDemandQuery,
  useGetAllDayDataQuery,
  useGetPowerConsumptionGraphDataQuery,
  useGetPowerConsumptionsBasedOnPublicHolidaysQuery,
  useGetPowerConsumptionsBasedOnWeatherDataQuery,
  useGetPowerFurtherRequiredFromSolarEnergyQuery,
  useGetInfrastructureDataQuery
} = api;
