import express from 'express';
import { logCardView,getTotalViews ,getUniqueViews,getViewsOverTime, getDeviceStats,getGeoStats} from '../controllers/analyticController.js';


const router = express.Router();

router.post('/:username/view',logCardView);

router.get('/total-views/:username', getTotalViews);
router.get('/unique-views/:username', getUniqueViews);
router.get('/views-over-time/:username', getViewsOverTime);
router.get('/:username/device-stats',getDeviceStats);
router.get('/:username/geo-stats', getGeoStats);
export default router;
