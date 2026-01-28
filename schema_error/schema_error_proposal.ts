import {z} from 'zod';
import { ActionType } from './ActionTypeRegistry';

//

const Error = z.object({ 
    error: z.string(),
    path: z.number()
});
