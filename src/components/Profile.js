const Profile = ({ data }) => {
  console.log(data);
  return (
    <>
      <h2>
        <em>{data.name}</em>
      </h2>
      <section>
        <h2>About Me</h2>
        <h6>Height: {data.height}</h6>
        <h6>Weight: {data.mass}</h6>
        <h6>Hair Color: {data.hair_color}</h6>
        <h6>Date of Birth: {data.birth_year}</h6>
        <h6>Species: TODO - do i make another api call?</h6>
      </section>
      <section>
        <h2>Films Appeared In</h2>
        <h6>
          TODO - do I do a promise.all and make api requests to get all the
          films to display via a list
        </h6>
      </section>
      <section>
        <h2>Starships Flown</h2>
        <h6>
          TODO - do I do a promise.all and make api requests to get all the
          starships flown and display via list
        </h6>
      </section>
    </>
  );
};

export default Profile;
