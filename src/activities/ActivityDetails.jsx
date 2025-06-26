import { useParams } from "react-router";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";

const ActivityDetails = () => {
  const { activityId } = useParams();
  const {
    data: activities,
    loading,
    error,
  } = useQuery("/activities", "activities");
  const activity = activities?.find((a) => a.id === Number(activityId));
  const {
    mutate: deleteActivity,
    loading: loadActivity,
    error: activityError,
  } = useMutation("DELETE", "/activities/" + activityId, ["activities"]);
  const { token } = useAuth();
  if (!activity) return <p>Activity not found.</p>;
  if (loading || !activities) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;
  return (
    <div>
      <h3>Activity Name: {activity.name}</h3>
      <p>Description: {activity.description}</p>
      <p>Creator ID: {activity.creatorId}</p>
      {token && (
        <button onClick={() => deleteActivity()}>
          {loading ? "Deleting" : error ? error : "Delete"}
        </button>
      )}
    </div>
  );
};

export default ActivityDetails;
