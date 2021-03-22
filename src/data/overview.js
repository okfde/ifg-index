import DefaultObj from '../utils/DefaultObj';
import serveVirtualFile from '../utils/serveVirtualFile';
import pointPercentage from '../utils/percentage';
import { getStates } from './states';
import { getCategories } from './categories';

async function overview() {
  const categories = await getCategories();
  const states = await getStates();

  const bars = new DefaultObj(() => ({ states: [] }));

  for (const { slug, color, description, maxPoints } of categories) {
    bars[slug].color = color;
    bars[slug].description = description;

    for (const state of states) {
      const points =
        state.performance.find(({ slug: t }) => t === slug)?.achievedPoints ||
        0;

      const percentage = pointPercentage(points, maxPoints);

      bars[slug].states.push({
        state: { slug: state.slug, name: state.name, short: state.short },
        percentage
      });
    }

    bars[slug].states.sort((a, b) => b.points - a.points);
  }

  const clean = { ...bars, toJSON: undefined };
  return clean;
}

export default serveVirtualFile('overview', overview);
