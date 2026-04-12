import { SKELETON_CELLS } from '../../constants';
import './Skeleton.css';

export function SkeletonRow() {
  return (
    <div className="ut-row ut-row--skeleton">
      {Array.from({ length: SKELETON_CELLS }, (_, i) => (
        <div key={i} className="ut-cell"><span className="ut-skeleton" /></div>
      ))}
      <div className="ut-cell ut-cell--actions" />
    </div>
  );
}
