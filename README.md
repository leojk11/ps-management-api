# ps-management-api

## Console
- id: string;
- name: string;
- model: string; (PS4, PS5)
- overall_time_played: string / number;
- today_time_played: string / number;

## Revenue card
- id: string;
- date: string;
- month: string;
- year: string;
- start_time: string;
- end_time: string;
- difference: string; (between start_time and end_time)
- cost: string;
- payed?: boolean;

## Settings
- id: string;
- hourly_price: number;

## Reservation
- id: string;
- game: string;
- console_id: string;
- console: Console;
