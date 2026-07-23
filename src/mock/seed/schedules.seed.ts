import type { ScheduleEntry, ScheduleStatus, TransportMode } from '@/types';
import { routesSeed } from './routes.seed';

const WEEKDAYS = [1, 2, 3, 4, 5];
const EVERY_DAY = [0, 1, 2, 3, 4, 5, 6];

const roadVehicles = ['BRT Bus 12', 'BRT Bus 27', 'BRT Bus 34', 'LAGBUS 108', 'LAGBUS 145'];
const ferryVessels = ['MV Lagos Ferry 1', 'MV Lagos Ferry 2', 'MV Lekki Express', 'MV Marina Runner'];

function toTimeString(minutesFromMidnight: number): string {
  const h = Math.floor(minutesFromMidnight / 60) % 24;
  const m = minutesFromMidnight % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function generateEntries(
  routeId: string,
  mode: TransportMode,
  startMinutes: number,
  endMinutes: number,
  frequencyMinutes: number,
  vehicles: string[],
  daysOfWeek: number[],
  capacity: number,
): ScheduleEntry[] {
  const entries: ScheduleEntry[] = [];
  let time = startMinutes;
  let i = 0;
  while (time <= endMinutes && entries.length < 8) {
    const status: ScheduleStatus = i === 2 ? 'delayed' : i === 6 ? 'cancelled' : 'on-time';
    entries.push({
      id: `sched-${routeId}-${i}`,
      routeId,
      mode,
      departureTime: toTimeString(time),
      daysOfWeek,
      vehicleName: vehicles[i % vehicles.length]!,
      capacity,
      status,
    });
    time += frequencyMinutes * 2;
    i += 1;
  }
  return entries;
}

export const schedulesSeed: ScheduleEntry[] = routesSeed.flatMap((route) => {
  const isFerry = route.mode === 'ferry';
  return generateEntries(
    route.id,
    route.mode,
    isFerry ? 6 * 60 : 5 * 60 + 30,
    isFerry ? 20 * 60 : 22 * 60,
    route.frequencyMinutes,
    isFerry ? ferryVessels : roadVehicles,
    isFerry ? EVERY_DAY : WEEKDAYS,
    isFerry ? 120 : 60,
  );
});
