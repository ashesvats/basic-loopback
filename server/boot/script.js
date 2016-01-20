module.exports = function (app)
{

  var  User=app.models.User;
  var Role=app.models.Role;
  var RoleMapping=app.models.RoleMapping;
  
  User.create([
      {username: 'admin', email: 'admin@project.com', password: 'admin#password@123'}
  ], function(err, users) {
      // if (err) return debug('%j', err);
    
      // Create the admin role
      Role.create({
        name: 'admin'
      }, function(err, role) {
        if (err) return debug(err);
        // debug(role);
  
        // Make Bob an admin
        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: users[0].id
        }, function(err, principal) {
          if (err) return debug(err);
          // debug(principal);
        });
      });
    });
}