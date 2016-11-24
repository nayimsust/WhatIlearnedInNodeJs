var obj = { f: sync(function () { 
                     print('I am synchronized!');
               })
          };

// 'f' is a "synchronized" method.
obj.f(); 